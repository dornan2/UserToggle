
// Comment to get more information during initialization
logLevel := Level.Info

// The Typesafe repository
resolvers += "Nitro Nexus" at "https://nexus.nitroplatform.com/nexus/content/groups/public/"

val sbtNitroVersion = "1.6.7"

addSbtPlugin("com.gonitro" % "avro-codegen-compiler" % "0.2.2")

addSbtPlugin("org.scoverage" % "sbt-scoverage" % "1.3.3")

addSbtPlugin("com.gonitro.platform" % "sbt-play-25" % sbtNitroVersion)

addSbtPlugin("com.gonitro.platform" % "sbt-nitro" % sbtNitroVersion)

addSbtPlugin("com.gonitro.platform" % "sbt-app-events" % sbtNitroVersion)

addSbtPlugin("com.gonitro.platform" % "sbt-dockit" % "ADRIAN")

addSbtPlugin("com.iheart" % "sbt-play-swagger" % "0.5.4")

addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.5.18")