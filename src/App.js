import React, { Component } from 'react'

const Item = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly'
}

const ItemHeader = {
  display: 'flex',
  alignSelf: 'center',
  justifyContent: 'center'
}

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      initialInvestment: 0,
      monthlyContribution: 0,
      monthlyContributionIncrease: 0,
      frequencyAddition: 0,
      rateOfGrowth: 9.7 //S&P 500 Average
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#282c34', color: 'white', fontSize: 24, flex: 1 }}>
        <header style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 24 }}>
          <h1>Stock Market Investment Calculator</h1>
        </header>

        <h4 style={ItemHeader}>Investment Information</h4>

        <div style={Item}>
          <div>
            <label>Initial Contribution</label>
            <input name={'initialInvestment'} onChange={(ev) => this.setState({ initialInvestment: Number(ev.target.value) })}/>
          </div>

          <div>
            <label>Monthly Contribution</label>
            <input name={'monthlyContribution'} onChange={(ev) => this.setState({ monthlyContribution: Number(ev.target.value) })}/>
          </div>

          <div>
            <label>Yearly Growth Rate</label>
            <input name={'rateOfGrowth'} placeholder={this.state.rateOfGrowth} onChange={(ev) => this.setState({ rateOfGrowth: Number(ev.target.value) })}/>
          </div>
        </div>

        <div style={Item}>
          <div>
            <label>Increase To Contribution $</label>
            <input name={'monthlyContributionYearlyIncrease'} onChange={(ev) => this.setState({ monthlyContributionIncrease: Number(ev.target.value) })}/>
          </div>

          <div>
            <label>Every 1-12 Months</label>
            <input name={'frequencyAddition'} onChange={(ev) => this.setState({ frequencyAddition: Number(ev.target.value) })}/>
          </div>
        </div>

        <h3 style={ItemHeader}>Investment Calculations</h3>

        <div style={Item}>
          <p>1 Year: ${this.calculateReturnOnInvestmentIn(1).toLocaleString()}</p>
          <p>5 Years: ${this.calculateReturnOnInvestmentIn(5).toLocaleString()}</p>
          <p>10 Years: ${this.calculateReturnOnInvestmentIn(10).toLocaleString()}</p>
        </div>

        <div style={Item}>
          <p>15 Year: ${this.calculateReturnOnInvestmentIn(15).toLocaleString()}</p>
          <p>20 Years: ${this.calculateReturnOnInvestmentIn(20).toLocaleString()}</p>
          <p>30 Years: ${this.calculateReturnOnInvestmentIn(30).toLocaleString()}</p>
        </div>

        <h6 style={ItemHeader}>Developed & Maintained by Andrei Villasana - Seattle, WA</h6>
        <h6 style={ItemHeader}>v. 1.0.0</h6>
      </div>
    )
  }

  calculateTotalContributions(years) {
    const { monthlyContribution, initialInvestment } = this.state

    const totalContributions = initialInvestment + ((monthlyContribution * 12) * years)
    return totalContributions
  }

  calculateReturnOnInvestmentIn(years) {
    const { rateOfGrowth, monthlyContribution, monthlyContributionIncrease, initialInvestment, frequencyAddition } = this.state
    
    const yearsInMonths = years * 12
    const monthlyRateOfGrowth = rateOfGrowth / 12

    let monthlyContributionWithAdditions = monthlyContribution
    let totalReturnOnInvestment = initialInvestment + monthlyContribution

    for (let month = 1; month < yearsInMonths; month++) {
      const isNewAdditionPeriod = month % frequencyAddition

      if (isNewAdditionPeriod === 0) {
        monthlyContributionWithAdditions += monthlyContributionIncrease
      }
      
      totalReturnOnInvestment += monthlyContributionWithAdditions
      const monthlyInvestmentProfit = (totalReturnOnInvestment / 100) * monthlyRateOfGrowth

      totalReturnOnInvestment += monthlyInvestmentProfit
    }

    return totalReturnOnInvestment
  }
}
