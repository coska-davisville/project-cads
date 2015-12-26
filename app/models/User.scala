package models

case class User(id: Option[Int], password: String, memberType: Option[Int], firstName: Option[String], lastName: Option[String], primaryContactNo: Option[String], secondaryContactNo: Option[String], email: String, streetAddress: Option[String], extraAddress: Option[String], cityId: Option[Int])
