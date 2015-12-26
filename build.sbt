import Gulp._
import play.PlayImport.PlayKeys.playRunHooks
import Keys._
import PlayKeys._

name := """project-cads"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  "org.postgresql" % "postgresql" % "9.4-1206-jdbc42",
  //"mysql" % "mysql-connector-java" % "5.1.37",
  "com.typesafe.play" %% "play-slick" % "1.1.1",
  "com.typesafe.play" %% "play-slick-evolutions" % "1.1.1",
  //jdbc,
  cache,
  ws,
  specs2 % Test
)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator := InjectedRoutesGenerator

// playRunHooks <+= baseDirectory.map(base => Gulp(base))

PlayKeys.devSettings += ("play.http.router", "dev.Routes")

//fork in run := true
