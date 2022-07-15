import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
} from '@nestjs/graphql';
import { Post } from 'src/posts/models/post.model';
import { BaseModel } from 'src/common/models/base.model';
import { Role } from '@prisma/client';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role can either be ADMIN, COACH or FELLOW',
});

@ObjectType()
export class User extends BaseModel {
  @HideField()
  password: string;

  email: string;

  firstname?: string;

  lastname?: string;

  @Field(() => Role)
  role: Role;

  posts: Post[];

  bio?: string;

  attentionStatement: string;

  issueCategory: string;

  issueType: string;

  country: string;

  phoneNumber: string;

  age: string;

  pictureUrl: string;
}
