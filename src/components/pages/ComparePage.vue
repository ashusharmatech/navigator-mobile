<template>
  <ScrollView>
    <StackLayout class="compare">
      <Label
        v-if="selectedSchemes.length === 0"
        text="Select up to 3 schemes to compare"
        class="empty-message"
      />
      
      <StackLayout v-for="scheme in selectedSchemes" :key="scheme.schemeCode" class="scheme-card">
        <GridLayout columns="*, auto" class="scheme-header">
          <Label :text="scheme.schemeName" col="0" class="scheme-name" textWrap="true" />
          <Button
            text="Remove"
            @tap="removeScheme(scheme.schemeCode)"
            col="1"
            class="remove-btn"
          />
        </GridLayout>
        
        <CartesianChart :series="getChartSeries(scheme)" height="200">
          <!-- Chart configuration -->
        </CartesianChart>
        
        <GridLayout rows="auto" columns="*, *, *" class="stats">
          <StackLayout col="0" class="stat-item">
            <Label text="Latest NAV" class="stat-label" />
            <Label :text="'₹' + getLatestNAV(scheme)" class="stat-value" />
          </StackLayout>
          <StackLayout col="1" class="stat-item">
            <Label text="1Y Return" class="stat-label" />
            <Label :text="getYearReturn(scheme) + '%'" class="stat-value" />
          </StackLayout>
          <StackLayout col="2" class="stat-item">
            <Label text="CAGR" class="stat-label" />
            <Label :text="getCAGR(scheme) + '%'" class="stat-value" />
          </StackLayout>
        </GridLayout>
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>

<script>
import { api } from '../../api/mutual-fund';
import { calculateStats } from '../../utils/navCalculations';

export default {
  data() {
    return {
      selectedSchemes: []
    };
  },
  methods: {
    removeScheme(schemeCode) {
      this.selectedSchemes = this.selectedSchemes.filter(
        s => s.schemeCode !== schemeCode
      );
    },
    getChartSeries(scheme) {
      return [{
        type: 'Line',
        items: scheme.data.map(item => ({
          date: item.date,
          value: parseFloat(item.nav)
        }))
      }];
    },
    getLatestNAV(scheme) {
      return parseFloat(scheme.data[0]?.nav || 0).toFixed(2);
    },
    getYearReturn(scheme) {
      // Calculate 1 year return
      return '0.00';
    },
    getCAGR(scheme) {
      const stats = calculateStats(scheme.data);
      return stats.cagr.toFixed(2);
    }
  }
};
</script>

<style scoped>
.compare {
  padding: 15;
}
.empty-message {
  text-align: center;
  color: #666;
  margin: 20;
}
.scheme-card {
  background-color: white;
  border-radius: 10;
  padding: 15;
  margin-bottom: 15;
}
.scheme-header {
  margin-bottom: 15;
}
.scheme-name {
  font-size: 16;
  font-weight: bold;
}
.remove-btn {
  background-color: #FF3B30;
  color: white;
  padding: 5 10;
  border-radius: 5;
}
.stats {
  margin-top: 15;
}
.stat-item {
  text-align: center;
}
.stat-label {
  font-size: 12;
  color: #666;
}
.stat-value {
  font-size: 14;
  font-weight: bold;
  color: #007AFF;
}
</style>