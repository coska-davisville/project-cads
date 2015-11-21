package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._

case class User(program: String, province: String, membership: String, email: String, firstName: String, lastName: String)

class Users extends Controller {
	
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

	val users = List(
		User("Snow Valley", "ON", "volunteer", "a@a.com", "John", "Smith"),
		User("Horseshoe", "ON", "participant skier", "b@b.com", "Jane", "Doe"),
		User("Horseshoe", "ON", "participant skier", "bb@bb.com", "Mariah", "Carey"),
		User("Mansfield", "ON", "participant skier", "c@c.com", "Carrie", "Underwood"),
		User("Snow Valley", "BC", "volunteer", "d@d.com", "John", "Smith"),
		User("Horseshoe", "BC", "participant skier", "e@e.com", "Jane", "Doe"),
		User("Mansfield", "BC", "participant skier", "f@f.com", "Carrie", "Underwood")
	)

	def all = Action {
		Ok(Json.toJson(users))
	}

	def get(id: String) = Action {
		users.find(_.email == id) match {
			case Some(user)	=> {
				Ok(Json.toJson(user))
			}
			case None 		=> Status(540)("No such user " + id)
		}
	}

	def login = Action {
		Ok("login")
	}

	def create = Action {
		Ok("create")
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