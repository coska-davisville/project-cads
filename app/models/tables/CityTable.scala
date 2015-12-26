package models.tables

import models.City
import slick.driver.JdbcProfile

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
