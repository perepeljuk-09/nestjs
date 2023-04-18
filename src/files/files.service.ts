import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, "..", "static");
      // if by this path don't nothing
      if (!fs.existsSync(filePath)) {
        //make dir
        fs.mkdirSync(filePath, { recursive: true });
      }
      console.log("log", file.buffer);
      console.log("path", path.join(filePath, fileName));
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (err) {
      throw new HttpException(
        "Произошла ошибка при записи файла на диск",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
