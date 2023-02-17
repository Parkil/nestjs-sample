import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

//PartialType : 원래 dto 에서 일부 데이터만 받아올수 있도록 변환, 원래 dto 의 validation 은 그대로 유지
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
