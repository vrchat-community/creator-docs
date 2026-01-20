---
description: "Pay out your earnings via PayPal or bank transfer."
sidebar_position: 5
sidebar_custom_props:
    customIcon: 💵
---

import Columns from '@site/src/components/Columns';
import Column from '@site/src/components/Column';

# Payout

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

You can pay out your earned VRChat Credits by visiting the [Payout](https://vrchat.com/home/marketplace/storefront/payout) page and requesting a payout from Tilia, VRChat's payment processor.


## 1. Manage payouts

After opening [vrchat.com](https://vrchat.com/home) and signing into your VRChat account, open the [Marketplace](https://vrchat.com/home/marketplace/) in the left-hand sidebar and open [My Store](https://vrchat.com/home/marketplace/storefront).

On the overview page, you can see your available payout amount. Click **Manage** to open the [payout management](https://vrchat.com/home/marketplace/storefront/payout/manage) page.

![Available payout section of My Store overview page.](/img/economy/TiliaPayout-Manage.png )

## 2. Check payout requirements

The payout management screen allows you to request new payouts and view your payout history. It also shows you all payout requirements, and which requirements you currently fulfill.

![Payout requirements list, with Request Payout available and payout history below.](/img/economy/TiliaPayout-Criteria.png)

You must fulfill all of the following criteria to request a payout:
- Your account must be in good standing and eligible to participate in the Creator Economy.
- Your wallet contains at least 20,000 *earned* VRChat Credits.[^2]
- You currently have no payout request in progress.
- You have not requested a payout in the last 24 hours.

[^2]: You cannot pay out Purchased or promotional VRChat Credits. If you buy VRChat Credits or receive them through a promotion, those credits do not count towards the minimum payout threshold.


If you fulfill all of the criteria above, click the **Request Payout** to continue.

## 3. Choose payout amount

Enter the number of credits you'd like to pay out. By default, the maximum payout amount is selected. You can see an estimate of the payout amount in USD below. You will see the final payout amount and fees after choosing your payout destination.

![Request Payout window where users choose their desired payout amount.](/img/economy/TiliaPayout-Amount.png)

Click **Request Payout** to proceed to Tilia. Tilia shows an additional confirmation of your selected payout amount.

![Tilia's Payout Amount screen showing 'VRC 20,000' and a Next button.](/img/economy/TiliaPayout-TiliaAmount.png)

Click **Next** to continue with choosing a payout destination. 


## 4. Choose payout destination

Choose or create a new payout destination. After creating a payout destination, you can use it without entering its details again. You can also delete payout destinations.

![Payout destination screen, allowing you to add PayPal or bank accounts.](/img/economy/TiliaPayout-AddProvider.png)

Currently, the following payout destinations are available:

<Columns> 
<Column className='text--left'>

### **PayPal**
- **Payout fee:** Approximately 1.5%

If your PayPal account is not in USD, PayPal incurs an additional currency conversion fee. This is not included in the payout fee.

Note that PayPal does not support payouts for users in all countries (see [Country and feature support](https://developer.paypal.com/docs/payouts/standard/reference/country-feature/)).

</Column>
<Column className='text--left'>

### Bank transfer
- **Payout fee:** Depends on your bank and country

Most US banks ask you to sign into your bank account. They may also offer multiple payout methods with different fees. In most other countries, you instead specify your IBAN and other information directly.

Bank transfers are only available in supported countries.

</Column>
</Columns>

:::warning

Your legal name must match the information you provided to Tilia. Mismatches are a common cause of rejected payouts.

:::

## 5. Confirm payout

After choosing your payout destination, review the details of your payout request. You can see your chosen destination, requested amount, fee, and final payout total.

![Tilia's confirmation screen, showing the destination, requested amount, fee, payout total, and a 'Submit' button.](/img/economy/TiliaPayout-ConfirmAndSubmit.png)

If everything looks correct, click **Submit** to submit your payout request. 

## 6. Receive payout

Tilia approves most payouts within one to two business days. When Tilia approves the payout, you receive a confirmation email from Thunes Financial Services LLC.

![An email confirmation a transaction summary, including fees and the final amount.](/img/economy/TiliaPayout-Email.png)

:::info

If your payout request was rejected by Tilia, please check your email inbox and your payout history to identify the reason. If you need further assistance, please [contact Tilia](https://tilia-vrchat.freshdesk.com/support/tickets/new).

:::

## Revenue split

VRChat shares the majority of the Creator Economy's revenue with sellers.

![Approximate revenue split](/img/economy/revenue-split-approximate.jpg "Approximate revenue split")

After VRChat Credits have been purchased, spent, and successfully paid out to creators, the revenue split approximates the following values:
- 30%:[^1] to the platform (Steam/Meta/etc.),
- 50%:[^1] to creators,
- 20%:[^1] to VRChat and its partners.

## Fees

Fees are collected in the following three steps:
1. **Buying Credits**: Users purchase VRChat Credits on Steam or Meta.
	- The total purchase fee is ~40%[^1].
	- In addition, the user pays [VAT](https://en.wikipedia.org/wiki/Value-added_tax), depending on their country of residence.
2. **Spending Credits**: Users spend VRChat Credits in a creator's store.
	- The total transaction fee is ~15.3%[^1].
3. **Paying out Credits**: Sellers pay out their earnings with Tilia.
	- Fees depend on your payout destination (PayPal is ~1.5%)[^1].

[^1]: The percentages are approximate and do not include VAT. The percentages can vary based on rounding, platforms, payout destination, and how VRChat Credits have flowed through the Creator Economy before payout. For additional information, please refer to the [Creator Economy Program Rules](https://hello.vrchat.com/legal/economy).
