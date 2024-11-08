import { IjrochiEntity } from 'src/ijrochi/entity/ijrochi.entity';
import { PrimaryGeneratedColumn, Column,  CreateDateColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'ariza' })
export  class ArizaEntity {
    
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    chat_id: string;

    @Column()
    ijrochi_id: number;

    @ManyToOne(() => IjrochiEntity, (ijrochi) => ijrochi.arizalar,)
    ijrochi: IjrochiEntity;

    @Column({ type: 'varchar', })
    fullname: string;

    @Column({ type: 'varchar', length: 13 })
    phone1: string;

    @Column({ type: 'varchar', length: 13 })
    phone2: string;


    @Column({ type: 'varchar', })
    address: string;

    @Column({ type: 'varchar',})
    desc: string;

    @Column({ type: 'varchar', default: "created" }) 
    status: string; // finished,canceled

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createAt: Date;

    @Column({ type: 'varchar', default: "text" })
    response_type: string; // image,document

    @Column({ type: 'varchar', default :"" })
    response: string;

    @Column({
        nullable : true
    })
    rate: string;


}