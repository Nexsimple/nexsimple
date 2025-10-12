import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle } from 'lucide-react';

export const ROICalculator = () => {
  const [employees, setEmployees] = useState<number>(10);
  const [hoursPerDay, setHoursPerDay] = useState<number>(2);
  const [avgSalary, setAvgSalary] = useState<number>(3000);

  const calculateLoss = () => {
    const hourlyRate = avgSalary / 160; // 160 horas úteis por mês
    const hoursPerMonth = hoursPerDay * 22; // 22 dias úteis
    const lossPerEmployee = hourlyRate * hoursPerMonth;
    const totalLoss = lossPerEmployee * employees;
    return Math.round(totalLoss);
  };

  const monthlySavings = calculateLoss();
  const yearlySavings = monthlySavings * 12;

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Quanto Dinheiro Você Está Perdendo?
            </h2>
            <p className="text-xl text-muted-foreground">
              Calcule em 30 segundos o prejuízo do trabalho manual
            </p>
          </div>

          <Card className="border-primary/30 shadow-2xl">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <TrendingUp className="w-6 h-6" />
                Calculadora de ROI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="employees" className="text-base mb-2 block">
                      Quantos funcionários você tem?
                    </Label>
                    <Input
                      id="employees"
                      type="number"
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                      min="1"
                      className="text-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hours" className="text-base mb-2 block">
                      Horas por dia em tarefas repetitivas?
                    </Label>
                    <Input
                      id="hours"
                      type="number"
                      value={hoursPerDay}
                      onChange={(e) => setHoursPerDay(Number(e.target.value))}
                      min="1"
                      max="8"
                      step="0.5"
                      className="text-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="salary" className="text-base mb-2 block">
                      Salário médio mensal (R$)
                    </Label>
                    <Input
                      id="salary"
                      type="number"
                      value={avgSalary}
                      onChange={(e) => setAvgSalary(Number(e.target.value))}
                      min="1000"
                      step="100"
                      className="text-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="bg-destructive/10 border-2 border-destructive rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-6 h-6 text-destructive" />
                      <h3 className="text-lg font-semibold text-destructive">
                        Você está perdendo:
                      </h3>
                    </div>
                    
                    <div className="text-center mb-4">
                      <p className="text-5xl font-bold text-destructive mb-2">
                        R$ {monthlySavings.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-muted-foreground">por mês</p>
                    </div>

                    <div className="text-center border-t border-destructive/30 pt-4">
                      <p className="text-2xl font-bold">
                        R$ {yearlySavings.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-sm text-muted-foreground">por ano</p>
                    </div>
                  </div>

                  <Button size="lg" className="w-full text-lg font-bold">
                    Quero Recuperar Esse Dinheiro! 🔥
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    *Cálculo baseado em custos médios de trabalho manual
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};