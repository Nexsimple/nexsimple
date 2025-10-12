import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Testimonial {
  id: string;
  client_name: string;
  client_company: string | null;
  client_role: string | null;
  client_photo_url: string | null;
  testimonial: string;
  result_metric: string | null;
  rating: number;
  order_index: number;
}

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const loadTestimonials = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('active', true)
        .order('order_index', { ascending: true });
      
      if (data) setTestimonials(data);
    };

    loadTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-muted-foreground">
            Resultados reais de empresários reais
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-primary/20">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="w-10 h-10 text-primary/30 mb-4" />
                  
                  <p className="text-foreground mb-6 flex-grow italic">
                    "{testimonial.testimonial}"
                  </p>

                  {testimonial.result_metric && (
                    <div className="bg-primary/10 rounded-lg p-3 mb-6">
                      <p className="text-primary font-bold text-center text-lg">
                        {testimonial.result_metric}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-auto">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.client_photo_url || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonial.client_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <p className="font-semibold">{testimonial.client_name}</p>
                      {testimonial.client_role && testimonial.client_company && (
                        <p className="text-sm text-muted-foreground">
                          {testimonial.client_role}, {testimonial.client_company}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-1 mt-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};