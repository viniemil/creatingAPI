import { Request, Response } from "express";
import { usersApp } from "../../db/users";

export class BalanceTransactionController {
  GetbalanceTransaction(request: Request, response: Response) {
    const { userId } = request.params;

    const user = usersApp.find((user) => userId === user.id);

    const transactions = user?.transactions;

    const balance = transactions?.reduce(
      (acc, { type }, index, vetor) => {
        if (type === "income") {
          acc.income += vetor[index].value;
        }
        if (type === "outcome") {
          acc.outcome += vetor[index].value;
        }
        if (index === vetor.length - 1)
          return {
            income: acc.income,
            outcome: acc.outcome,
            total: acc.income - acc.outcome,
          };
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    );

    return response
      .status(200)
      .json({ transactions: transactions, balance: balance });
  }
}
