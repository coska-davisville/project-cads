package controllers

import models.tables.UserTable
import play.api.Play
import play.api.data.Form
import play.api.data.Forms.mapping
import play.api.data.Forms.text
import play.api.data.Forms.number
import play.api.data.Forms.optional
import play.api.db.slick.{HasDatabaseConfig, DatabaseConfigProvider}
import play.api.mvc.Controller
import play.api.mvc.Action
import slick.driver.JdbcProfile
import scala.concurrent.Future
import play.api.libs.concurrent.Execution.Implicits.defaultContext

class Examples extends Controller with UserTable with HasDatabaseConfig[JdbcProfile] {
  val dbConfig = DatabaseConfigProvider.get[JdbcProfile]("cads")(Play.current)
  import dbConfig.driver.api._

  val Users = TableQuery[Users]

  val userForm = Form(
    mapping(
      "id" -> optional(number),
      "name" -> text(),
      "address" -> text()
    )(models.User.apply)(models.User.unapply)
  )

  val index = Action.async {
    val users: Future[Seq[models.User]] = dbConfig.db.run(Users.result)
    users.map(res => Ok(views.html.examples(res)))
  }

  def getUser(id: Int) = Action.async {
    val user: Future[Seq[models.User]] = dbConfig.db.run(Users.filter(_.id === id).result)
    user.map(res => Ok(views.html.examples(res)))
  }

  def create = Action.async { implicit rs =>
    val user = userForm.bindFromRequest.get
    dbConfig.db.run(Users += user).map(_ => Redirect(routes.Examples.index))
  }

  def delete(id: Int) = Action.async {
    dbConfig.db.run(Users.filter(_.id === id).delete).map(_ => Redirect(routes.Examples.index))
  }

  def update(id: Int) = Action.async { implicit rs =>
    val user = userForm.bindFromRequest.get
    dbConfig.db.run(Users.filter(_.id === id).update(user)).map(_ => Redirect(routes.Examples.index))
  }
}