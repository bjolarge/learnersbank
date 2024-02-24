import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { CreateAccountBalanceDto } from './dto/create-account-balance.dto';
import { CreateAccountDepositDto } from './dto/create-account-deposit.dto';

@Injectable()
export class AccountsService {
  constructor( @InjectRepository(Account)
  private readonly accountRepository:Repository<Account>
  ){}
  // create(createAccountDto: CreateAccountDto) {
  //   return 'This action adds a new account';
  // }

  async create(createAccountDto:CreateAccountBalanceDto,
    ) { 
   const account = await this.accountRepository.create(createAccountDto)
    return this.accountRepository.save(account);
  }

  async createdeposit(createAccountDto:CreateAccountDepositDto,
    ) { 
   const account = await this.accountRepository.create(createAccountDto)
    return this.accountRepository.save(account);
  }

  async createwithdrawal(createAccountDto:CreateAccountDepositDto,
    ) { 
   const account = await this.accountRepository.create(createAccountDto)
    return this.accountRepository.save(account);
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
