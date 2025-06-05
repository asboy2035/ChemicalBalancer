<template>
  <div class="container">
    <h1>Glucose Combustion</h1>

    <div class="equation">
      <label>
        <input type="number" v-model.number="simple.reactantC6H12O6" min="0" />
        C₆H₁₂O₆
      </label>

      <Icon style="opacity: 0.5" icon="stash:plus-solid" width="24" height="24" />

      <label>
        <input type="number" v-model.number="simple.reactantO2" min="0" />
        O₂
      </label>

      <Icon icon="solar:arrow-right-line-duotone" width="24" height="24" />

      <label>
        <input type="number" v-model.number="simple.productCO2" min="0" />
        CO₂
      </label>

      <Icon style="opacity: 0.5" icon="stash:plus-solid" width="24" height="24" />

      <label>
        <input type="number" v-model.number="simple.productH2O" min="0" />
        H₂O
      </label>
    </div>

    <div :class="['status', { balanced: isSimpleBalanced }]">
      <h3>Atoms:</h3>
      <ul>
        <li>Hydrogen atoms: {{ simpleCounts.reactants.H }} → {{ simpleCounts.products.H }}</li>
        <li>Carbon atoms: {{ simpleCounts.reactants.C }} → {{ simpleCounts.products.C }}</li>
        <li>Oxygen atoms: {{ simpleCounts.reactants.O }} → {{ simpleCounts.products.O }}</li>
      </ul>


      <h2 v-if="isSimpleBalanced">✅ Balanced!</h2>
      <h2 v-else>❌ Not balanced</h2>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import {Icon} from "@iconify/vue"

const coefficients = reactive({
  reactant1: 1,
  reactant2: 1,
  product1: 1,
  product2: 1
});

const atomCounts = computed(() => {
  const r1 = coefficients.reactant1
  const r2 = coefficients.reactant2
  const p1 = coefficients.product1
  const p2 = coefficients.product2

  return {
    reactants: {
      C: r1 * 7,
      H: r1 * 6,
      O: r1 * 2 + r2 * 2
    },
    products: {
      C: p1 * 1,
      H: p2 * 2,
      O: p1 * 2 + p2 * 1
    }
  };
});

const isBalanced = computed(() => {
  const a = atomCounts.value;
  return (
    a.reactants.C === a.products.C &&
    a.reactants.H === a.products.H &&
    a.reactants.O === a.products.O
  )
})

// Simple H2 + O2 → H2O

const simple = reactive({
  reactantC6H12O6: 1,
  reactantO2: 1,
  productCO2: 1,
  productH2O: 1
})

const simpleCounts = computed(() => {
  const sugar = simple.reactantC6H12O6
  const o2 = simple.reactantO2
  const co2 = simple.productCO2
  const h2o = simple.productH2O

  return {
    reactants: {
      C: sugar * 6,
      H: sugar * 12,
      O: sugar * 6 + o2 * 2
    },
    products: {
      C: co2 * 1,
      H: h2o * 2,
      O: co2 * 2 + h2o * 1
    }
  };
});

const isSimpleBalanced = computed(() => {
  const a = simpleCounts.value;
  return (
    a.reactants.C === a.products.C &&
    a.reactants.H === a.products.H &&
    a.reactants.O === a.products.O
  );
});
</script>

<style scoped>
h1 {
  font-family: serif;
  font-size: 5rem;
}

h1, h2, h3, h4, h5, h6, p, ul {
  margin: 1rem 0.25rem 0.25rem;
}

.container {
  margin: 1rem;
  padding: 2rem;
  font-family: sans-serif;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.equation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.equation input {
  width: 3rem;
  padding: 0.25rem;
  font-size: 3.5rem;
  border: none;
  color: indigo;
  text-align: center;
  font-family: sans-serif;
}

.status {
  padding: 1.5rem 2rem 2rem;
  border: 2px solid;
  border-radius: 1.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.25rem;
  flex-direction: column;
  border-color: #ff0000;
  color: #ff0000;
  background: rgba(255, 0, 0, 0.1);
}

.status.balanced {
  border-color: #4caf50;
  color: #4caf50;
  background: rgba(76, 175, 80, 0.1);
}

label {
  font-size: 3.5rem;
  display: flex;
  gap: 0.1rem;
}

ul {
  padding-left: 1rem;
}
</style>
