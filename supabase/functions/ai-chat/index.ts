import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
serve(async (req)=>{
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  try {
    if (!openAIApiKey) throw new Error('OpenAI API key not configured');
    if (!supabaseUrl || !supabaseKey) throw new Error('Supabase credentials not configured');
    const supabaseClient = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: req.headers.get('Authorization')
        }
      }
    });
    const { message } = await req.json();
    console.log('Received chat message:', message);
    // First check for premade responses in database
    const { data: premadeResponse } = await supabaseClient.from('ai_responses').select('response').ilike('question', `%${message.toLowerCase()}%`).limit(1).single();
    if (premadeResponse?.response) {
      console.log('Returning premade response');
      return new Response(JSON.stringify({
        response: premadeResponse.response,
        source: 'database'
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // If no premade response, use OpenAI
    const systemPrompt = `You are Neeraj's AI assistant on his portfolio website. You help visitors learn about his professional background and expertise.

About Neeraj:
- Student at SRM University, Chennai, pursuing B.Tech in Computer Science and Engineering
- Hobbies in Drawing, Gaming, Animation, and Web Development
- As of {CurrentYear} in 4th year of B.Tech 
- Expected graduation in May 2026
- 10+ completed projects
- Projects built with/in Python, React, AI/ML, cybersecurity, and PyQt desktop development
- Keen interest in computer vision with OpenCV, real-time systems, and security implementations
- Passionate about AI integration, cybersecurity, and building secure, intelligent systems
- Available for new projects and collaborations
- Contact: Mail ID: Manisneeraj13@gmail.com || Mobile number: +91 7418093937
- Location: Chennai,India

Key expertise areas:
- AI/ML: TensorFlow, PyTorch, computer vision, real-time AI systems
- Security: Security auditing, penetration testing, system hardening, secure architectures
- Development: Python, React, PyQt, system-level programming to modern web applications
- Projects: Object-Detection, intelligent desktop applications, Face Recognition System

Guidelines:
1. Be helpful, professional, and encourage visitors to reach out through the contact form
2. Keep responses organized and concise (1-3 paragraphs max)
3. For technical questions, provide specific examples when possible
4. If unsure, direct to contact form rather than guessing
5. Format responses with markdown for better readability`;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });
    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }
    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    console.log('AI response generated successfully');
    // Cache this new response in database for future similar questions
    await supabaseClient.from('ai_responses').insert([
      {
        question: message.toLowerCase(),
        response: aiResponse,
        is_generated: true
      }
    ]);
    return new Response(JSON.stringify({
      response: aiResponse,
      source: 'openai'
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({
      error: 'Sorry, I encountered an error. Please try again or contact Neeraj directly through the contact form.'
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});
