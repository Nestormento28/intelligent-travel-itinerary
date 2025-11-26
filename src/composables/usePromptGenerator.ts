import type {FormData} from './useSearchValidation'

/**
 * Composable for generating search prompts
 */
export function usePromptGenerator() {
    /**
     * Format guest count for prompt
     */
    const formatGuestText = (guests: number): string => {
        return guests === 1 ? '1 adult' : `${guests} adults`
    }

    /**
     * Format budget for prompt
     */
    const formatBudgetText = (budget: number): string => {
        return `a budget of ${budget}€`
    }

    /**
     * Format extra info for prompt
     */
    const formatExtraInfoText = (extraInfo: string): string => {
        return extraInfo.trim() ? `. Extra info: ${extraInfo.trim()}` : ''
    }

    /**
     * Generate a search prompt based on form data
     */
    const generatePrompt = (formData: FormData): string => {
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
     */
    const sendPrompt = (prompt: string): void => {
        console.log(prompt)
        // TODO: if all good takes to another landing
        // if not, shows the message in the chat (or not if submitted from the form)
    }

    return {
        generatePrompt,
        sendPrompt
    }
}

