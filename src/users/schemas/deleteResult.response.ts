import { ApiProperty } from "@nestjs/swagger";

export class DeleteResultResponse {
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
    description: "Number how many rows are removed",
  })
  affected: number;
}
