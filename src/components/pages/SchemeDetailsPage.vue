<template>
  <Page>
    <ActionBar :title="schemeDetails?.meta?.scheme_name || 'Scheme Details'" />
    <ScrollView>
      <StackLayout class="scheme-details">
        <!-- Overview Section -->
        <StackLayout class="card">
          <Label :text="schemeDetails?.meta?.scheme_name" class="scheme-name" textWrap="true" />
          <Label :text="'Fund House: ' + schemeDetails?.meta?.fund_house" class="fund-house" />
          <Label :text="'Latest NAV: ₹' + latestNAV" class="nav-value" />
          <Label :text="'as of ' + latestNAVDate" class="nav-date" />
        </StackLayout>

        <!-- Performance Chart -->
        <StackLayout class="card">
          <Label text="Performance" class="section-title" />
          <CartesianChart :series="chartSeries" height="300">
            <!-- Chart configuration -->
          </CartesianChart>
        </StackLayout>

        <!-- SIP Calculator -->
        <StackLayout class="card">
          <Label text="SIP Calculator" class="section-title" />
          <TextField
            v-model="sipAmount"
            keyboardType="number"
            hint="Monthly Investment Amount"
            class="input"
          />
          <Button text="Calculate" @tap="calculateSIP" class="calculate-btn" />
          
          <GridLayout rows="auto" columns="*, *" class="results">
            <StackLayout col="0" class="result-item">
              <Label text="Total Investment" class="result-label" />
              <Label :text="'₹' + sipResults.totalInvestment" class="result-value" />
            </StackLayout>
            <StackLayout col="1" class="result-item">
              <Label text="Current Value" class="result-label" />
              <Label :text="'₹' + sipResults.currentValue" class="result-value" />
            </StackLayout>
          </GridLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { api } from '../../api/mutual-fund';
import { calculateSIP } from '../../utils/sipCalculations';

export default {
  props: {
    schemeCode: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      schemeDetails: null,
      sipAmount: '1000',
      sipResults: {
        totalInvestment: 0,
        currentValue: 0
      }
    };
  },
  computed: {
    latestNAV() {
      return this.schemeDetails?.data[0]?.nav || '0';
    },
    latestNAVDate() {
      return this.schemeDetails?.data[0]?.date || '';
    },
    chartSeries() {
      // Transform NAV data for chart
      if (!this.schemeDetails) return [];
      return [{
        type: 'Line',
        items: this.schemeDetails.data.map(item => ({
          date: item.date,
          value: parseFloat(item.nav)
        }))
      }];
    }
  },
  async created() {
    try {
      this.schemeDetails = await api.getHistoricalNAV(this.schemeCode);
    } catch (error) {
      console.error('Error fetching scheme details:', error);
    }
  },
  methods: {
    calculateSIP() {
      if (!this.schemeDetails) return;
      
      const amount = parseFloat(this.sipAmount);
      if (isNaN(amount) || amount <= 0) {
        // Show error dialog
        return;
      }

      const results = calculateSIP(
        this.schemeDetails.data,
        amount,
        'monthly',
        new Date()
      );

      this.sipResults = {
        totalInvestment: results.totalInvestment.toFixed(2),
        currentValue: results.currentValue.toFixed(2)
      };
    }
  }
};
</script>

<style scoped>
.scheme-details {
  padding: 15;
}
.card {
  background-color: white;
  border-radius: 10;
  padding: 15;
  margin-bottom: 15;
}
.scheme-name {
  font-size: 20;
  font-weight: bold;
  margin-bottom: 10;
}
.fund-house {
  color: #666;
  margin-bottom: 15;
}
.nav-value {
  font-size: 24;
  color: #007AFF;
  font-weight: bold;
}
.nav-date {
  color: #666;
  font-size: 12;
}
.section-title {
  font-size: 18;
  font-weight: bold;
  margin-bottom: 15;
}
.input {
  margin: 10 0;
  padding: 10;
  border-width: 1;
  border-color: #ccc;
  border-radius: 5;
}
.calculate-btn {
  background-color: #007AFF;
  color: white;
  margin: 10 0;
}
.results {
  margin-top: 15;
}
.result-item {
  padding: 10;
  text-align: center;
}
.result-label {
  color: #666;
  font-size: 12;
}
.result-value {
  font-size: 16;
  font-weight: bold;
  color: #007AFF;
}
</style>