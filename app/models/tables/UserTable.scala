package models.tables

import models.User
import play.api.db.slick.{HasDatabaseConfigProvider, DatabaseConfigProvider}
import slick.driver.JdbcProfile
import slick.profile.SqlProfile.ColumnOption.{NotNull, Nullable}
import javax.inject.{Singleton, Inject}

@Singleton()
class UserTable @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
  extends HasDatabaseConfigProvider[JdbcProfile]{

  import driver.api._

  class Users(tag: Tag) extends Table[User](tag, "User") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def password = column[String]("passwd", NotNull)

    def memberType = column[Int]("memberType", O.Default(0))

    def firstName = column[String]("firstName", O.Default(""))

    def lastName = column[String]("lastName", O.Default(""))

    def primaryContactNo = column[String]("primaryContactNo", O.Default(""))

    def secondaryContactNo = column[String]("secondaryContactNo", O.Default(""))

    def email = column[String]("email")

    def streetAddress = column[String]("streetAddress", O.Default(""))

    def extraAddress = column[String]("extraAddress", O.Default(""))

    def cityId = column[Int]("cityId", Nullable)

    //def city = foreignKey("City_FK", cityId, TableQuery[Cities])(_.id, onUpdate=ForeignKeyAction.Cascade, onDelete=ForeignKeyAction.Restrict)

    def * = (id.?, password, memberType.?, firstName.?, lastName.?, primaryContactNo.?, secondaryContactNo.?, email, streetAddress.?, extraAddress.?, cityId.?) <> (User.tupled, User.unapply _)
  }
}
