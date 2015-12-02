package controllers

import play.api._
import play.api.mvc._

class Application extends Controller {

  def index = controllers.Assets.at("/public", 
  	(if (Play.current.mode == Mode.Dev) "index.html" else "dist/index.html"))

  def testApiList = Action {
    Ok(views.html.index("Your new application is ready."))
  }
}
