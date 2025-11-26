/**
 * Composable for generating search prompts
 * @returns {Object} Prompt generation methods
 */
export function usePromptGenerator() {
  /**
   * Format guest count for prompt
   * @param {number} guests - Number of guests
   * @returns {string} Formatted guest text
   */
  const formatGuestText = (guests) => {
    return guests === 1 ? '1 adult' : `${guests} adults`
  }

  /**
   * Format budget for prompt
   * @param {number} budget - Budget value
   * @returns {string} Formatted budget text
   */
  const formatBudgetText = (budget) => {
    return `a budget of ${budget}\u20AC`
  }

  /**
   * Format extra info for prompt
   * @param {string} extraInfo - Extra information
   * @returns {string} Formatted extra info text
   */
  const formatExtraInfoText = (extraInfo) => {
    return extraInfo.trim() ? `. Extra info: ${extraInfo.trim()}` : ''
  }

  /**
   * Generate a search prompt based on form data
   * @param {Object} formData - Form data for prompt generation
   * @param {string} formData.activeTab - Current active tab
   * @param {string} formData.origin - Origin location
   * @param {string} formData.destination - Destination location
   * @param {string} formData.flightDateType - Flight date type (single/range)
   * @param {string} formData.singleFlightDate - Single flight date
   * @param {Object} formData.dateRangeData - Date range data
   * @param {number} formData.budget - Budget value
   * @param {number} formData.guests - Number of guests
   * @param {string} formData.extraInfo - Extra information
   * @returns {string} Generated prompt
   */
  const generatePrompt = (formData) => {
    const {
      activeTab,
      origin,
      destination,
      flightDateType,
      singleFlightDate,
      dateRangeData,
      budget,
      guests,
      extraInfo
    } = formData

    const guestText = formatGuestText(guests)
    const budgetText = formatBudgetText(budget)
    const extraInfoText = formatExtraInfoText(extraInfo)

    if (activeTab === 'hotel') {
      return `I want to book a hotel in ${destination} from ${dateRangeData.startDate} to ${dateRangeData.endDate} for ${guestText} with ${budgetText}${extraInfoText}`
    }

    if (activeTab === 'flights') {
      if (flightDateType === 'single') {
        return `I want to book a one-way flight from ${origin} to ${destination} on ${singleFlightDate} for ${guestText} with ${budgetText}${extraInfoText}`
      } else {
        return `I want to book a round-trip flight from ${origin} to ${destination} from ${dateRangeData.startDate} to ${dateRangeData.endDate} for ${guestText} with ${budgetText}${extraInfoText}`
      }
    }

    // hotel+flights
    return `I want to book a hotel and flight from ${origin} to ${destination} from ${dateRangeData.startDate} to ${dateRangeData.endDate} for ${guestText} with ${budgetText}${extraInfoText}`
  }

  /**
   * Send a prompt (currently logs to console)
   * @param {string} prompt - Prompt to send
   */
  const sendPrompt = (prompt) => {
    console.log(prompt)
    // TODO: if all good takes to another landing
    // if not, shows the message in the chat (or not if submitted from the form)
  }

  return {
    generatePrompt,
    sendPrompt
  }
}
