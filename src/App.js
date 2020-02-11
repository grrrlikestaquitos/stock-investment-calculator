import React, { Component } from 'react'

const Item = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  marginBottom: 50
}

const SubItem = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
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
          <div style={SubItem}>
            <p>1 Year: ${this.calculateReturnOnInvestmentIn(1).toLocaleString()}</p>
            <p>Contibutions: ${this.calculateTotalContributions(1).toLocaleString()}</p>
            <p>Profit: {this.calculateGrossProfit(1)}</p>
          </div>

          <div style={SubItem}>
            <p>5 Years: ${this.calculateReturnOnInvestmentIn(5).toLocaleString()}</p>
            <p>Contibutions: ${this.calculateTotalContributions(5).toLocaleString()}</p>
            <p>Profit: {this.calculateGrossProfit(5)}</p>
          </div>

          <div style={SubItem}>
            <p>10 Years: ${this.calculateReturnOnInvestmentIn(10).toLocaleString()}</p>
            <p>Contibutions: ${this.calculateTotalContributions(10).toLocaleString()}</p>
            <p>Profit: {this.calculateGrossProfit(10)}</p>
          </div>
        </div>

        <div style={Item}>
          <div style={SubItem}>
            <p>15 Years: ${this.calculateReturnOnInvestmentIn(15).toLocaleString()}</p>
            <p>Contibutions: ${this.calculateTotalContributions(15).toLocaleString()}</p>
            <p>Profit: {this.calculateGrossProfit(15)}</p>
          </div>

          <div style={SubItem}>
            <p>20 Years: ${this.calculateReturnOnInvestmentIn(20).toLocaleString()}</p>
            <p>Contibutions: ${this.calculateTotalContributions(20).toLocaleString()}</p>
            <p>Profit: {this.calculateGrossProfit(20)}</p>
          </div>

          <div style={SubItem}>
            <p>30 Years: ${this.calculateReturnOnInvestmentIn(30).toLocaleString()}</p>
            <p>Contibutions: ${this.calculateTotalContributions(30).toLocaleString()}</p>
            <p>Profit: {this.calculateGrossProfit(30)}</p>
          </div>
        </div>

        <h6 style={ItemHeader}>Developed & Maintained by Andrei Villasana - Seattle, WA</h6>
        <h6 style={ItemHeader}>v. 1.0.0</h6>
      </div>
    )
  }

  calculateTotalContributions(years) {
    const { monthlyContribution, initialInvestment, monthlyContributionIncrease, frequencyAddition } = this.state
    const yearsInMonths = years * 12

    let totalContributions = initialInvestment + monthlyContribution

    for (let month = 1; month < yearsInMonths; month++) {
      const isNewAdditionPeriod = month % frequencyAddition

      if (isNewAdditionPeriod === 0) {
        totalContributions += monthlyContributionIncrease
      }
      
      totalContributions += monthlyContribution
    }
    return totalContributions
  }

  calculateGrossProfit(years) {
    const profit = this.calculateReturnOnInvestmentIn(years) - this.calculateTotalContributions(years)
    const profitPercent = profit / this.calculateReturnOnInvestmentIn(years) * 100

    return `$${profit.toLocaleString()} - ${profitPercent.toLocaleString()}%`
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
