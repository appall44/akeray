// @Entity()
// export class MaintenanceRequest {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   description: string;

//   @Column()
//   status: 'pending' | 'in-progress' | 'resolved';

//   @ManyToOne(() => User, (user) => user.maintenanceRequests)
//   tenant: User;

//   @ManyToOne(() => Unit, (unit) => unit.maintenanceRequests)
//   unit: Unit;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// }
