import { ArizaEntity } from 'src/ariza/entity/ariza.entity';
import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'ijrochi' })
export class IjrochiEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: 'varchar', })
    nomi: string;

    @Column({ type: 'varchar', })
    fullname: string;

    @Column()
    chat_id: string;

    @OneToMany(() => ArizaEntity, (ariza) => ariza.ijrochi)
    arizalar: ArizaEntity[];

}