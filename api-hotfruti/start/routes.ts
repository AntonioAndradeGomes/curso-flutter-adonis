import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { message: "hello world" };
});

//login
Route.post("/login", "AuthController.login");
//logout
Route.post("/logout", "AuthController.logout");

Route.group(() => {
  Route.get("/auth/me", "AuthController.me");

  //edição do cliente
  Route.put("/client", "ClientsController.update");
}).middleware("auth");

Route.post("/client/register", "ClientsController.store");

//cidades
Route.get("/cities", "CitiesController.index");
Route.get("/cities/:id/establishments", "CitiesController.establishments");
