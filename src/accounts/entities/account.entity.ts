import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    accountNumber:number;
    @Column()
    accountName:string;
    @Column()
    balance:number;
    @Column()
    deposit:number; 

    constructor(
        id:number,
        balance:number,
        deposit:number,

    ){
        this.id = id;
        this.balance = balance;
        this.deposit = deposit;
        //this.withdrawals = withdrawals;
    }

    totalAmount(amount:number){
        this.balance +=amount;
    }

    withdrawals(amount:number){
    this.balance -=amount;
    }
}
