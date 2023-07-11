import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.maxLength(255),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({}, [rules.minLength(6), rules.maxLength(180)]),
    phone: schema.string({trim: true}, [
      rules.mobile({
        locale: ['pt-BR'],
      }),
      rules.maxLength(15),
    ]),
  });

  public messages: CustomMessages = {
    required: "The {{ field }} is required for registration",
    "email.email": "The {{ field }} must be a valid email",
    "email.unique": "The email is already in use",
    "password.minLength" : "The {{ field }} must be at least 6 characters long",
    "password.maxLength" : "The {{ field }} must have a maximum of 180 characters",
    "phone.mobile": "The {{ field }} must be a valid phone",
  };
}
