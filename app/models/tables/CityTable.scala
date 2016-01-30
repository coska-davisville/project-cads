package models.tables

import javax.inject.{Singleton, Inject}
import models.City
import models.tables.ProvinceTable
import play.api.db.slick.{HasDatabaseConfigProvider, DatabaseConfigProvider}
import slick.driver.JdbcProfile

@Singleton()
class CityTable @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends ProvinceTable
  with HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  class Cities(tag: Tag) extends Table[City](tag, "City") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def provinceId = column[Int]("provinceId")
    def name = column[String]("name")

    def province = foreignKey("Prov_FK", provinceId, TableQuery[Provinces])(_.id, onUpdate=ForeignKeyAction.Cascade, onDelete=ForeignKeyAction.Cascade)

    def * = (id.?, provinceId, name) <> (City.tupled, City.unapply _)
  }
}
