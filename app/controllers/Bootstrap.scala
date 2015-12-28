package controllers

import play.api.mvc.{Action, Controller}
import javax.inject.Inject
import models.tables.{ProvinceDAO, CityDAO, UserDAO}
import slick.dbio.DBIO

class Boostrap @Inject() (provinceDAO: ProvinceDAO, cityDAO: CityDAO, userDAO: UserDAO) extends Controller {
  val provs = provinceDAO.Provinces
  val cities = cityDAO.Cities
  val users = userDAO.Users

  def login = Action {
    val setup = DBIO.seq(
      (provs.schema ++ cities.schema ++ users.schema).create
    )
    Ok("DB Created")
  }
}