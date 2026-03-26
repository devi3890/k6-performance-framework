k6 Performance Project

Run test:
k6 run scripts/login.js

Custom execution:
VUS=10 DURATION=1m BASE_URL=https://test.k6.io k6 run scripts/login.js
