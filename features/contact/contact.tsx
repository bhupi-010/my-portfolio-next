'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MessageSquare, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Section, SectionHeader, Button, Card } from '@/components/ui';
import { FadeIn } from '@/components/animations';
import { cn } from '@/lib/utils';

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'nathbhupi10@gmail.com',
    href: 'mailto:nathbhupi10@gmail.com',
    description: 'Drop me a line anytime',
  },
  {
    icon: MessageSquare,
    title: 'LinkedIn',
    value: 'Bhupendra Nath',
    href: 'https://www.linkedin.com/in/bhupendra-nath-838887233/',
    description: 'Let\'s connect professionally',
  },
];

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formRef.current) return;

    setFormState({ status: 'loading', message: '' });

    try {
      await emailjs.sendForm(
        'service_han0s2b',
        'template_650daal',
        formRef.current,
        'WFWD19f2aJh0879Mp'
      );

      setFormState({
        status: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.',
      });
      formRef.current.reset();
    } catch (error) {
      setFormState({
        status: 'error',
        message: 'Something went wrong. Please try again or email me directly.',
      });
    }
  };

  return (
    <Section id="contact" className="bg-muted/30">
      <SectionHeader
        label="Get in Touch"
        title="Let's Work Together"
        description="Have a project in mind? I'd love to hear about it. Let's discuss how I can help."
      />

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Methods */}
        <FadeIn direction="right">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Reach Out</h3>
              <p className="text-muted-foreground">
                I&apos;m always open to discussing new opportunities, interesting projects, 
                or just having a chat about frontend development.
              </p>
            </div>

            <div className="space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <Card className="flex items-center gap-4 transition-all group-hover:border-primary">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <method.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors">
                        {method.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </Card>
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Based in Nepal • Available for remote opportunities worldwide
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Contact Form */}
        <FadeIn direction="left" delay={0.2}>
          <Card hover={false}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Status Message */}
              {formState.status !== 'idle' && formState.status !== 'loading' && (
                <div
                  className={cn(
                    'flex items-center gap-2 p-3 rounded-lg text-sm',
                    formState.status === 'success'
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-red-500/10 text-red-500'
                  )}
                >
                  {formState.status === 'success' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {formState.message}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full"
                disabled={formState.status === 'loading'}
              >
                {formState.status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </FadeIn>
      </div>
    </Section>
  );
}
