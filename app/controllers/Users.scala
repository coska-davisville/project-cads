package controllers

import play.api._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfig}
import play.api.http._
import play.api.mvc._
import play.api.libs.json._
import models.tables.UserTable

import play.api.Logger
import slick.driver.JdbcProfile

case class User(program: String, province: String, membership: String, email: String, firstName: String, lastName: String)

/*
object Users extends Controller {

	case class UserForm(email: String, password: String)
	case class UserCredential(email: String, token: String)

	val wrongEmailOrPassword = Status(520)("Wrong email or password")

	// Form mapping definitions

	val userForm = Form(
		mapping(
			"email" -> email,
			"password" -> nonEmptyText
		)(UserForm.apply)(UserForm.unapply))


	// implicits for JSON serialization

	implicit val userCredentialWrites = new Writes[UserCredential] {
	  def writes(uc: UserCredential) = Json.obj(
	  	"email"		-> uc.email,
	  	"token"		-> uc.token
	  )
	}

	implicit val userWrites = new Writes[User] {
	  def writes(user: User) = Json.obj(
	  	"program"		-> user.program,
	  	"province"		-> user.province,
	    "membership"	-> user.membership,
	    "email"			-> user.email,
	    "firstName"		-> user.firstName,
	    "lastName"		-> user.lastName
	  )
	}

	// test data
	val users = List(
		User("Snow Valley", "ON", "volunteer", "a@a.com", "John", "Smith"),
		User("Horseshoe", "ON", "participant skier", "b@b.com", "Jane", "Doe"),
		User("Horseshoe", "ON", "participant skier", "bb@bb.com", "Mariah", "Carey"),
		User("Mansfield", "ON", "participant skier", "c@c.com", "Carrie", "Underwood"),
		User("Snow Valley", "BC", "volunteer", "d@d.com", "John", "Smith"),
		User("Horseshoe", "BC", "participant skier", "e@e.com", "Jane", "Doe"),
		User("Mansfield", "BC", "participant skier", "f@f.com", "Carrie", "Underwood")
	)
}
*/

class Users extends Controller with UserTable with HasDatabaseConfig[JdbcProfile] {
  val dbConfig = DatabaseConfigProvider.get[JdbcProfile]("cads")(Play.current)

  import dbConfig.driver.api._

	def login = Action { implicit request =>
	}

	def create = Action {
		Ok("create")
	}

	def all = Action { implicit request =>
		request.headers.get(HeaderNames.AUTHORIZATION) match {
			case Some(auth)	=> {
				Logger.info(auth)
				Ok(Json.toJson(users))
			}
			case None 		=> Unauthorized("Need to login.")
		}
	}

	def get(id: String) = Action {
		users.find(_.email == id) match {
			case Some(user)	=> {
				Ok(Json.toJson(user))
			}
			case None 		=> Status(540)("No such user " + id)
		}
	}

	def getUsersByProvince(provinceId: String) = Action {
		Ok(Json.toJson(users.filter(_.province == provinceId)))
	}

	def getUsersByProgram(provinceId: String, programId: String) = Action {
		Ok(Json.toJson(users.filter(u => u.province == provinceId && u.program == programId)))
	}

	def getUsersByPage(pageSize: Int, pageNum: Int) = Action {
		val pn = pageSize * (pageNum - 1)
		Ok(Json.toJson(users.drop(pn).take(pageSize)))
	}
}