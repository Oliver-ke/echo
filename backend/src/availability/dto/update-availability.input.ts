import { InputType, Field } from '@nestjs/graphql';
import { CreateAvailabilityInput } from './create-availability.input';

@InputType()
export class UpdateAvailabilityInput extends CreateAvailabilityInput {
  @Field({ nullable: true })
  active: boolean;

  @Field({ nullable: true })
  available: boolean;
}
