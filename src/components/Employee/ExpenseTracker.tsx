import { DollarSign, Receipt, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface ExpenseTrackerProps {
  estimatedBudget: number
  totalExpenses: number
  totalAdvance: number
  receiptsCount: number
}

export function ExpenseTracker({ 
  estimatedBudget, 
  totalExpenses, 
  totalAdvance,
  receiptsCount 
}: ExpenseTrackerProps) {
  const percentage = estimatedBudget > 0 
    ? Math.min((totalExpenses / estimatedBudget) * 100, 100) 
    : 0

  const remaining = estimatedBudget - totalExpenses
  const isOverBudget = totalExpenses > estimatedBudget

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Expense Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Budget Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">Estimated Budget</p>
            <p className="text-xl font-bold text-blue-900">{formatCurrency(estimatedBudget)}</p>
          </div>
          <div className={`p-4 rounded-lg border ${isOverBudget ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
            <p className={`text-xs mb-1 ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
              {isOverBudget ? 'Over Budget' : 'Remaining'}
            </p>
            <p className={`text-xl font-bold ${isOverBudget ? 'text-red-900' : 'text-green-900'}`}>
              {formatCurrency(Math.abs(remaining))}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Expenses</span>
            <span className="font-semibold">{formatCurrency(totalExpenses)}</span>
          </div>
          <Progress 
            value={percentage} 
            className={isOverBudget ? 'bg-red-200' : ''} 
          />
          <p className="text-xs text-muted-foreground text-right">
            {percentage.toFixed(1)}% of budget used
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Advance Received</p>
              <p className="font-semibold">{formatCurrency(totalAdvance)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Receipt className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Receipts Uploaded</p>
              <p className="font-semibold">{receiptsCount}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}