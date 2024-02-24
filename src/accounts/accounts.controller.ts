import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CreateAccountBalanceDto } from './dto/create-account-balance.dto';
import { CreateAccountDepositDto } from './dto/create-account-deposit.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('/accountbalance')
  create(@Body() createAccountDto:CreateAccountBalanceDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Post('/deposit')
  createdeposit(@Body() createAccountDto:CreateAccountDepositDto) {
    return this.accountsService.createdeposit(createAccountDto);
  }

  

  // @Post()
  // create(@Body() createAccountDto: CreateAccountDto) {
  //   return this.accountsService.create(createAccountDto);
  // }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
