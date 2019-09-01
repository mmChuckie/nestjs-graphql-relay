import { Field, ID, ObjectType } from 'type-graphql';
import { Node } from '../../nodes/models/node.model';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { toGlobalId } from 'graphql-relay';
import { connectionTypes } from '../../common/connectionPaging';
import { User } from '../../users/models/user.model';

@Entity()
@ObjectType({ implements: Node })
export class Cat implements Node {
  @Field(type => ID)
  get id(): string {
    return toGlobalId('Cat', this.internalId);
  }

  @PrimaryGeneratedColumn('uuid')
  readonly internalId: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  age: number;

  @ManyToOne(type => User, user => user.cats)
  @Field(type => User)
  user: User;
}

export const { Connection, Edge } = connectionTypes('cat', Cat);
