import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('data_sources')
export class DataSourceEntity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'data_sources_pkey',
  })
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
