import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { message: "hello world" };
});

//login
Route.post("/login", "AuthController.login",);
//logout
Route.post("/logout", "AuthController.logout");
