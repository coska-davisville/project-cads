package models.tables

import models.Province
import play.api.db.slick.{HasDatabaseConfigProvider, DatabaseConfigProvider}
import slick.driver.JdbcProfile
import javax.inject.{Singleton, Inject}

trait ProvinceTable {
  val Provinces: Provinces
  protected val driver: JdbcProfile
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

    val Provinces = TableQuery[Provinces]

}

