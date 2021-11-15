import { ApiProperty } from "@nestjs/swagger";

export class UpdateResultResponse {
  @ApiProperty({
    example: [],
  })
  generatedMaps: string[];

  @ApiProperty({
    example: [],
  })
  raw: string[];

  @ApiProperty({
    example: 1,
    description: "Number how many rows are modified",
  })
  affected: number;
}
