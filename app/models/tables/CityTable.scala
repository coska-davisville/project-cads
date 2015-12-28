package models.tables

import models.City
import play.api.db.slick.{HasDatabaseConfigProvider, DatabaseConfigProvider}
import slick.driver.JdbcProfile
import javax.inject.{Singleton, Inject}

trait CityTable { self: ProvinceTable =>
  val Cities: Cities
  protected val driver: JdbcProfile
  import driver.api._

  class Cities(tag: Tag) extends Table[City](tag, "City") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def provinceId = column[Int]("provinceId")
    def name = column[String]("name")

    def province = foreignKey("Prov_FK", provinceId, TableQuery[Provinces])(_.id, onUpdate=ForeignKeyAction.Cascade, onDelete=ForeignKeyAction.Cascade)

    def * = (id.?, provinceId, name) <> (City.tupled, City.unapply _)
  }
}

@Singleton()
class CityDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends CityTable
  with HasDatabaseConfigProvider[JdbcProfile] {
    import driver.api._

    val Cities = TableQuery[Cities]
}
