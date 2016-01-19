package models.tables

import models.Province
import slick.driver.JdbcProfile

trait ProvinceTable {
  protected val driver: JdbcProfile
  import driver.api._

  class Provinces(tag: Tag) extends Table[Province](tag, "Province") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def abbr = column[String]("abbr")

    def * = (id.?, name, abbr) <> (Province.tupled, Province.unapply _)
  }
}
