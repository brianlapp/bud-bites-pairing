import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()
    console.log('Proxying image request for URL:', url)

    if (!url) {
      throw new Error('URL parameter is required')
    }

    // Fetch the image with a timeout
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    try {
      const imageResponse = await fetch(url, { 
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      })
      
      clearTimeout(timeout)

      if (!imageResponse.ok) {
        throw new Error(`Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`)
      }

      const contentType = imageResponse.headers.get('content-type')
      const imageBlob = await imageResponse.blob()

      return new Response(imageBlob, {
        headers: {
          ...corsHeaders,
          'Content-Type': contentType || 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000'
        }
      })
    } catch (fetchError) {
      clearTimeout(timeout)
      throw fetchError
    }
  } catch (error) {
    console.error('Error in proxy-image function:', error)
    return new Response(
      JSON.stringify({
        error: error.message || 'An unexpected error occurred while proxying the image'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})