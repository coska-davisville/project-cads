package models.tables

import models.User
import slick.driver.JdbcProfile

trait UserTable {
  protected val driver: JdbcProfile
  import driver.api._

  class Users(tag: Tag) extends Table[User](tag, "User") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def address = column[String]("address")

    def * = (id.?, name, address) <> (User.tupled, User.unapply _)
  }
}
