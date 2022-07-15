import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  attentionStatement?: string;

  @Field({ nullable: true })
  issueCategory?: string;

  @Field({ nullable: true })
  issueType?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  age?: string;

  @Field({ nullable: true })
  pictureUrl?: string;
}
