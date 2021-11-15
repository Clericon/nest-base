import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponse {
  @ApiProperty({
    example: 404,
    description: "HTTP status code",
  })
  statusCode: number;

  @ApiProperty({
    example: ["User not found"],
    description: "Describing error message",
  })
  message: string[];

  @ApiProperty({
    example: "Not Found",
    description: "Short error message",
  })
  error: string;
}
