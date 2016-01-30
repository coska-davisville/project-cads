package models.tables

import models.Province
import play.api.db.slick.{HasDatabaseConfigProvider, DatabaseConfigProvider, HasDatabaseConfig}
import slick.driver.JdbcProfile
import javax.inject.{Singleton, Inject}
import models.{Page, Province}

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

trait ProvinceTable { self: HasDatabaseConfig[JdbcProfile] =>
  import driver.api._

  class Provinces(tag: Tag) extends Table[Province](tag, "Province") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def abbr = column[String]("abbr")

    def * = (id.?, name, abbr) <> (Province.tupled, Province.unapply _)
  }
}

@Singleton()
class ProvinceDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends ProvinceTable
  with HasDatabaseConfigProvider[JdbcProfile] {
  import driver.api._

  val provinces = TableQuery[Provinces]

  def count(filter: String): Future[Int] = {
    db.run(provinces.filter { province => province.name.toLowerCase like filter.toLowerCase }.length.result)
  }

  def getAll(): Future[Seq[Province]] = {
    val query = (for {
      province <- provinces
    } yield (province))

    db.run(query.result).map(rows => rows.map { province => province})
  }

  def list(page: Int=0, pageSize: Int=10, orderBy: Int=1, filter: String = "%"): Future[Page[(Int, String, String)]] = {
    val offset = pageSize * page
    val query =
      (for {
        province <- provinces
        if province.name.toLowerCase like filter.toLowerCase
      } yield (province.id, province.name, province.abbr))
        .drop(offset)
        .take(pageSize)

    for {
      totalRows <- count(filter)
      list = query.result.map { rows => rows.collect { case (province) => (province)}}
      result <- db.run(list)
    } yield Page(result, page, offset, totalRows)
  }
}
