export default defineEventHandler(async (event) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  // In a real-world scenario, you'd use a geolocation service here
  return {
    country: 'الإمارات العربية المتحدة',
    flagUrl: 'https://flagcdn.com/w320/ae.png'
  }
})
