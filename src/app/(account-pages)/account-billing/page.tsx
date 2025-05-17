import React from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import T from '@/utils/getT'

const AccountBilling = () => {
	return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING */}
      <h2 className="text-3xl font-semibold">
        {T["accountPage"]["Payments & payouts"]}
      </h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="max-w-2xl">
        <span className="block text-xl font-semibold">
          {T["accountPage"]["Payout methods"]}
        </span>
        <br />
        <span className="block text-neutral-700 dark:text-neutral-300">
          {` Om automatische uitbetalingen via de Mollie API in te stellen, vragen we je om een eenmalige verificatiebetaling van €0,01 te doen`}
          <br />
          <br />
          Deze stap is essentieel om je bankrekening te verifiëren en
          toekomstige uitbetalingen te automatiseren
        </span>
        <div className="pt-10">
          <ButtonPrimary>{T["accountPage"]["Add payout method"]}</ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

export default AccountBilling
