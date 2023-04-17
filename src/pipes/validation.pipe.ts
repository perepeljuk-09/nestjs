import { Injectable, PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    // reassign value to needly our class
    const obj = plainToClass(metadata.metatype, value);
    //get error by validation
    const errors = await validate(obj);

    if (errors.length) {
      console.log(errors);

      let messages = errors.map((error) => {
        return `${error.property} - ${Object.values(error.constraints).join(
          ", "
        )}`;
      });
      // array of errors

      throw new ValidationException(messages);
    }
    return value;
  }
}
